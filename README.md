# Simulador de Entrevistas Utilizando las APIs de InfoJobs y OpenAI
## AI Interview Odyssey!
(En la demo que se mustra se utiliza una version simulada para no consumir los costes de la api de OpenAI)

![266shots_so](https://github.com/Rodriiandino/ai-interview-odyssey-infojobs/assets/106351323/7f898114-f92f-4348-ae50-621dcff11733)

<hr>

Es una aplicación web desarrollada con Next.js que utiliza las APIs de InfoJobs y OpenAI para simular entrevistas de trabajo. La aplicación permite al usuario elegir la personalidad del entrevistador, el tipo de entrevista y la oferta de trabajo deseada. En base a estos parámetros, la inteligencia artificial genera preguntas y respuestas, proporcionando al usuario una experiencia simulada de entrevista.

### Tecnologías

- React.js
- Next.js
- Tailwind CSS
- TypeScript
- Lodash
- OpenAI API
- InfoJobs API

<hr>

![688shots_so](https://github.com/Rodriiandino/ai-interview-odyssey-infojobs/assets/106351323/50ee8937-9dff-4929-a435-c10bb4687c87)

<hr>

### Funcionalidades
- Generación de preguntas y respuestas utilizando la API de OpenAI.
- Integración con la API de InfoJobs para obtener ofertas de trabajo.
- Personalización de la personalidad del entrevistador y el tipo de entrevista.
- Interfaz de usuario intuitiva y fácil de usar, basado en el diseño de Infojobs.

<hr>

![418shots_so](https://github.com/Rodriiandino/ai-interview-odyssey-infojobs/assets/106351323/11b8ea95-db9c-47a8-896d-4313ec5f1143)

<hr>

### Cómo Ejecutar
- Clona este repositorio en tu máquina local.
- En el archivo .env.local colocas tu variables de entorno 
- En el archivo interview-context.tsx descomentas "`const interviewData = useInterviewData()`" y comentas o eliminas la linea "`const interviewData = useInterviewDataMock()`"
- Ejecuta `npm install` para instalar las dependencias.
- Ejecuta `npm run dev` para iniciar la aplicación en modo de desarrollo.
- Abre tu navegador y visita el localhost, en el puerto en que se levanto.
- Y disfruta!!

  ![923shots_so](https://github.com/Rodriiandino/ai-interview-odyssey-infojobs/assets/106351323/a11117c5-24db-4f16-808a-8647abd61cb4)
