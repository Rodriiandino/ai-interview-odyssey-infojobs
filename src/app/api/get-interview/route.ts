import { InterviewType, Interviewer } from '@/app/types/training-key'
import { SearchParamsInterviewKeys } from '@/app/types/interview-key'
import { APIResultOffer } from '@/app/types/result-offer'
import { NextRequest, NextResponse } from 'next/server'
import { getInterviewData } from '@/app/utils/get-interview-data'
import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { fetchApiInfojobsGetJob } from '@/app/services/fetch-api-infojobs'
import { InterviewData } from '@/app/types/interview-key'

export const GET = async (req: NextRequest) => {
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
  const prompt = `Como entrevistador, tu tarea es llevar a cabo una entrevista del tipo ${interviewType}, adoptando la personalidad del entrevistador ${interviewer}. Nos enfocaremos en los requisitos del puesto y los detalles laborales proporcionados. El trabajo requiere lo siguiente:

  Título del puesto: ${jobData.title},
  Requisitos mínimos: ${
    jobData.requirementMin || jobData.minRequirements || jobData.description
  }
  
  Debes crear una pregunta y cuatro posibles respuestas, con solo una correcta, siguiendo el siguiente formato deseado:

  Pregunta:
  
  Respuestas:
  1.
  2.
  3.
  4.
  
  Respuesta correcta:

  Explicación:
  
  Asegúrate de cumplir con los requisitos siguientes:
  
  1. Garantizar que solo haya una respuesta correcta y que el orden sea aleatorio.
  2. Seguir el formato de pregunta y respuestas indicado.
  3. Adaptar la pregunta y las respuestas a la personalidad del entrevistador y al tipo de entrevista.
  4. las respuestas deben ser coherentes con los requisitos del puesto y los detalles laborales proporcionados.
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
