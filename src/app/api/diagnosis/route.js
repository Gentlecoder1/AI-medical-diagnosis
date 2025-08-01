import {
  getMedicalDiagnosis,
  getFollowUpQuestions,
} from "../../../services/openaiService";

export async function POST(request) {
  try {
    const body = await request.json();
    const { symptoms, patientInfo, action = "diagnose" } = body;

    if (!symptoms) {
      return Response.json({ error: "Symptoms are required" }, { status: 400 });
    }

    let result;

    if (action === "diagnose") {
      result = await getMedicalDiagnosis(symptoms, patientInfo);
    } else if (action === "questions") {
      result = await getFollowUpQuestions(symptoms);
    } else {
      return Response.json({ error: "Invalid action" }, { status: 400 });
    }

    if (!result.success) {
      return Response.json({ error: result.error }, { status: 500 });
    }

    return Response.json(result);
  } catch (error) {
    console.error("API Route Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
