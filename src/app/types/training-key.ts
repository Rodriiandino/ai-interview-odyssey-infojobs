export enum SearchParamKey {
  InterviewType = 'interview-type',
  Interviewer = 'interviewer',
  JobId = 'id-jobs'
}

export enum InterviewType {
  Technical = 'technical',
  Behavioral = 'behavioral',
  Case = 'case'
}

export enum Interviewer {
  DrJokester = 'Dr. Jokester',
  MadameEccentric = 'Madame Eccentric',
  CaptainQuirk = 'Captain Quirk'
}

export const interviewTypeDescriptions = {
  [InterviewType.Technical]:
    'Enfocado en evaluar las habilidades técnicas y conocimientos específicos necesarios para el puesto.',
  [InterviewType.Behavioral]:
    'Enfocado en evaluar las habilidades y comportamientos del candidato en situaciones de trabajo.',
  [InterviewType.Case]:
    'Enfocado en evaluar la capacidad del candidato para resolver problemas complejos y analizar situaciones empresariales.'
}

export const interviewerDescriptions = {
  [Interviewer.DrJokester]:
    'Un robot con sentido del humor extravagante y una actitud optimista.',
  [Interviewer.MadameEccentric]:
    'Una entrevistadora virtual con una personalidad excéntrica y creativa.',
  [Interviewer.CaptainQuirk]:
    'Un entrevistador virtual con una personalidad excéntrica y amante de la ciencia ficción.'
}
