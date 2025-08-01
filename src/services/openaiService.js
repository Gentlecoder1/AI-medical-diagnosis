import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getMedicalDiagnosis(symptoms, patientInfo) {
  try {
    const prompt = `
Patient Information:
${JSON.stringify(patientInfo, null, 2)}

Clinical Presentation:
${symptoms}

Provide medical assessment:

1. DIFFERENTIAL DIAGNOSIS:
List possible conditions in order of likelihood

2. RECOMMENDED ACTIONS:
Immediate steps for patient management

3. RED FLAGS:
Symptoms requiring urgent medical evaluation

4. FOLLOW-UP:
Recommended monitoring and care plan
`;

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a clinical decision support system. Provide direct, concise medical assessments without unnecessary pleasantries or formalities. Use standard medical terminology and formatting. Always include educational disclaimer.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.3,
      max_tokens: 800,
    });

    return {
      success: true,
      diagnosis: completion.choices[0].message.content,
      usage: completion.usage,
    };
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return {
      success: false,
      error: error.message || "Failed to get diagnosis from AI",
    };
  }
}

export async function getFollowUpQuestions(symptoms) {
  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Generate clinical interview questions for patient assessment. Be direct and professional.",
        },
        {
          role: "user",
          content: `Clinical presentation: "${symptoms}"\n\nList 5 essential history questions for diagnostic clarification:`,
        },
      ],
      temperature: 0.3,
      max_tokens: 250,
    });

    return {
      success: true,
      questions: completion.choices[0].message.content,
    };
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
