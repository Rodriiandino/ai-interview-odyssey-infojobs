import { InterviewType, Interviewer } from '@/app/types/training-key'
import { SearchParamsInterviewKeys } from '@/app/types/interview-key'
import { APIResultOffer } from '@/app/types/result-offer'
import { NextResponse } from 'next/server'
import { getInterviewData } from '@/app/utils/get-interview-data'
import OpenAI from 'openai'
import { title } from 'process'

const apiKeyOpenAI = process.env.OPENAI_API_KEY

const openai = new OpenAI({ apiKey: apiKeyOpenAI })

export const GET = async (req: { url: string | URL }) => {
  const { searchParams } = new URL(req.url)

  const selectedInterviewType = searchParams.get(
    SearchParamsInterviewKeys.InterviewType
  ) as InterviewType
  const selectedInterviewer = searchParams.get(
    SearchParamsInterviewKeys.Interviewer
  ) as Interviewer

  const selectedJob: string = searchParams.get(SearchParamsInterviewKeys.JobId)!

  const { interviewCharacteristics, interviewPersonality } = getInterviewData(
    selectedInterviewType,
    selectedInterviewer
  )

  const jobData: APIResultOffer = await getJobData({ selectedJob })
  // const openAIResponse = await getOpenAIResponse({
  //   interviewer: selectedInterviewer,
  //   interviewType: selectedInterviewType,
  //   jobData
  // })

  const mockOpenAIResponse = `Pregunta:

    ¡Hola! Imagina que eres un superhéroe del código y te encuentras en una misión para salvar el mundo de un caos digital. De repente, te enfrentas a un desafío técnico. ¿Cómo abordarías la situación?
    
    Respuestas:
    
    1. Llamaría a mi fiel compañero, el "Debugger Man", para que me ayude a rastrear el problema.
    2. Analizaría detenidamente los requisitos y diseñaría una solución utilizando las últimas tendencias en tecnologías front-end.
    3. Haría una pausa para tomar una taza de café y dejar que mi mente brillante encuentre la solución.
    4. Gritaría "¡Eureka!" y comenzaría a escribir código a toda velocidad mientras bailo la canción del éxito.
    
    Respuesta correcta: Analizaría detenidamente los requisitos y diseñaría una solución utilizando las últimas tendencias en tecnologías front-end.
    
    Explicación:
    
    En situaciones de resolución de problemas complejos, es crucial analizar cuidadosamente los requisitos y diseñar una solución efectiva utilizando las últimas tendencias en tecnologías front-end, como se especifica en los requisitos del puesto. Llamar a un compañero, tomar un descanso o tener una epifanía pueden ser pasos posteriores, pero el análisis y diseño inicial son fundamentales.`

  const interviewData = {
    jobData: {
      title: jobData.title,
      requirement:
        jobData.requirementMin || jobData.minRequirements || jobData.description
    },
    openAIResponse: mockOpenAIResponse
  }

  try {
    return NextResponse.json(interviewData)
  } catch (error) {
    console.error('Error:', error)
  }
}

const clientId = process.env.INFOJOBS_CLIENT_KEY
const clientSecret = process.env.INFOJOBS_SECRET_KEY
const authHeader = `Basic ${btoa(`${clientId}:${clientSecret}`)}`

const getJobData = async ({ selectedJob }: { selectedJob: string }) => {
  const url = `https://api.infojobs.net/api/1/offer/${selectedJob}`
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    return await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}

const getOpenAIResponse = async ({
  interviewType,
  interviewer,
  jobData
}: {
  interviewType: string
  interviewer: string
  jobData: APIResultOffer
}) => {
  const prompt = `Como entrevistador, tu tarea es llevar a cabo una entrevista del tipo ${interviewType}, adoptando la personalidad del entrevistador ${interviewer}. Nos enfocaremos en los requisitos del puesto y los detalles laborales proporcionados. El trabajo requiere lo siguiente:


  Título del puesto: ${jobData.title},
  Requisitos mínimos: ${
    jobData.requirementMin || jobData.minRequirements || jobData.description
  }
  
  
  Debes crear una pregunta y cuatro posibles respuestas, con solo una correcta, siguiendo el siguiente formato:
  
  
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
  const completion = await openai.completions.create({
    model: 'gpt-3.5-turbo',
    prompt: prompt,
    temperature: 0.2,
    max_tokens: 100
  })

  const openAIResponse = completion.choices[0].text

  if (openAIResponse) {
    return openAIResponse
  }
}
