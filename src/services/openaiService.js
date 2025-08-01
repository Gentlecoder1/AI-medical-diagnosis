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

Provide a structured medical assessment in JSON format with the following structure:

{
  "differentialDiagnosis": [
    {
      "condition": "condition name",
      "likelihood": "high/medium/low",
      "description": "brief description"
    }
  ],
  "recommendedActions": [
    "immediate action 1",
    "immediate action 2"
  ],
  "redFlags": [
    "symptom or finding requiring urgent attention"
  ],
  "followUp": [
    "monitoring instruction 1",
    "care plan item 2"
  ],
  "riskLevel": "low/medium/high",
  "urgency": "routine/urgent/immediate",
  "additionalTests": [
    "recommended test 1",
    "recommended test 2"
  ],
  "lifestyle": [
    "lifestyle recommendation 1",
    "lifestyle recommendation 2"
  ],
  "disclaimer": "This analysis is for educational purposes only. Always consult healthcare professionals for medical decisions."
}

Return ONLY the JSON object, no additional text.`;

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a clinical decision support system. Provide structured medical assessments in JSON format only. Be direct, concise, and use standard medical terminology. Always include educational disclaimers.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.3,
      max_tokens: 1000,
    });

    // Parse JSON response from ChatGPT
    const responseText = completion.choices[0].message.content.trim();
    let diagnosisData;
    
    try {
      // Try to parse JSON response
      diagnosisData = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      // Fallback to text response if JSON parsing fails
      diagnosisData = {
        differentialDiagnosis: [{ condition: "Analysis provided", likelihood: "unknown", description: responseText }],
        recommendedActions: ["Consult healthcare professional"],
        redFlags: [],
        followUp: [],
        riskLevel: "unknown",
        urgency: "routine",
        additionalTests: [],
        lifestyle: [],
        disclaimer: "This analysis is for educational purposes only. Always consult healthcare professionals for medical decisions."
      };
    }

    return {
      success: true,
      diagnosis: diagnosisData,
      rawResponse: responseText,
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
