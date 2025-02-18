import { InterviewType, Interviewer } from '@/types/training-key'
import { SearchParamsInterviewKeys } from '@/types/interview-key'
import { APIResultOffer } from '@/types/result-offer'
import { NextResponse } from 'next/server'
import { getInterviewData } from '@/utils/get-interview-data'
import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { fetchApiInfojobsGetJob } from '@/services/fetch-api-infojobs'
import { InterviewData } from '@/types/interview-key'

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const selectedInterviewType = searchParams.get(
      SearchParamsInterviewKeys.InterviewType
    ) as InterviewType
    const selectedInterviewer = searchParams.get(
      SearchParamsInterviewKeys.Interviewer
    ) as Interviewer
    const selectedJob = searchParams.get(SearchParamsInterviewKeys.JobId)
    const clientToken = searchParams.get('token')
    const aiModel = searchParams.get(SearchParamsInterviewKeys.AIModel)

    if (
      !selectedInterviewType ||
      !selectedInterviewer ||
      !selectedJob ||
      !clientToken ||
      !aiModel
    ) {
      throw new Error(
        'Parámetros de búsqueda incompletos o token no proporcionado'
      )
    }

    const { interviewCharacteristics, interviewPersonality } = getInterviewData(
      selectedInterviewType,
      selectedInterviewer
    )

    const jobData: APIResultOffer = await fetchApiInfojobsGetJob({
      selectedJob
    })

    if (!jobData) {
      throw new Error('No se pudo obtener los datos del trabajo')
    }

    const openAIResponse = await getOpenAIResponse({
      interviewer: interviewPersonality,
      interviewType: interviewCharacteristics,
      jobData,
      token: clientToken,
      model: aiModel
    })

    const interviewData: InterviewData = {
      jobData: {
        title: jobData.title,
        requirement:
          jobData.requirementMin ||
          jobData.minRequirements ||
          jobData.description
      },
      openAIResponse
    }

    return NextResponse.json(interviewData)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

const getOpenAIResponse = async ({
  interviewType,
  interviewer,
  jobData,
  token,
  model
}: {
  interviewType: string
  interviewer: string
  jobData: APIResultOffer
  token: string
  model: string
}): Promise<string> => {
  const openAI = createOpenAI({ apiKey: token })
  const modelo = openAI(model)
  const prompt = `Como entrevistador experto, tu tarea es llevar a cabo una entrevista del tipo ${interviewType}, adoptando la personalidad del entrevistador ${interviewer}. Nos enfocaremos en los requisitos del puesto y los detalles laborales proporcionados. El trabajo requiere lo siguiente:

Título del puesto: ${jobData.title},
Requisitos mínimos: ${
    jobData.requirementMin || jobData.minRequirements || jobData.description
  }

Debes crear una pregunta y cuatro posibles respuestas, con solo una correcta, siguiendo estrictamente el siguiente formato:

Pregunta:
[La pregunta debe estar claramente formulada y adaptada al tipo de entrevista y la personalidad del entrevistador.]

Respuestas:
1. [Respuesta opción 1]
2. [Respuesta opción 2]
3. [Respuesta opción 3]
4. [Respuesta opción 4]

Respuesta correcta:
[Número de la respuesta correcta]. [Texto de la respuesta correcta]

Explicación:
[Una explicación detallada que justifique por qué esa es la respuesta correcta, relacionándola con los requisitos del puesto y los detalles laborales proporcionados.]

Asegúrate de cumplir con los siguientes requisitos:

1. Garantizar que solo haya una respuesta correcta y que las opciones estén presentadas en un orden aleatorio.
2. Seguir estrictamente el formato indicado: "Pregunta:", "Respuestas:", "Respuesta correcta:" (con el número correspondiente), y "Explicación:".
3. Adaptar la pregunta y las respuestas a la personalidad del entrevistador y al tipo de entrevista.
4. Las respuestas deben ser coherentes con los requisitos del puesto y los detalles laborales proporcionados.
5. Utilizar un tono profesional o creativo según corresponda al tipo de entrevista y la personalidad del entrevistador.
6. Incluir ejemplos relevantes o situaciones hipotéticas si es necesario para contextualizar la pregunta.
7. Tiene que ser 4 respuestas, no más ni menos. Y no te olvides de enumerarlas.

Ejemplo de formato deseado:
Pregunta:
¡Hola! Imagina que eres un superhéroe del código y te encuentras en una misión para salvar el mundo de un caos digital. De repente, te enfrentas a un desafío técnico. ¿Cómo abordarías la situación?

Respuestas:
1. Llamaría a mi fiel compañero, el "Debugger Man", para que me ayude a rastrear el problema.
2. Analizaría detenidamente los requisitos y diseñaría una solución utilizando las últimas tendencias en tecnologías front-end.
3. Haría una pausa para tomar una taza de café y dejar que mi mente brillante encuentre la solución.
4. Gritaría "¡Eureka!" y comenzaría a escribir código a toda velocidad mientras bailo la canción del éxito.

Respuesta correcta:
2. Analizaría detenidamente los requisitos y diseñaría una solución utilizando las últimas tendencias en tecnologías front-end.

Explicación:
En situaciones de resolución de problemas complejos, es crucial analizar cuidadosamente los requisitos y diseñar una solución efectiva utilizando las últimas tendencias en tecnologías front-end, como se especifica en los requisitos del puesto. Llamar a un compañero, tomar un descanso o tener una epifanía pueden ser pasos posteriores, pero el análisis y diseño inicial son fundamentales.
  `

  try {
    const response = await generateText({
      model: modelo,
      prompt,
      temperature: 0.4,
      maxTokens: 500
    })

    if (response) {
      return response.text
    } else {
      throw new Error('No se ha podido obtener una respuesta de OpenAI')
    }
  } catch (error) {
    throw new Error(`Error al obtener la respuesta de OpenAI: ${error}`)
  }
}
