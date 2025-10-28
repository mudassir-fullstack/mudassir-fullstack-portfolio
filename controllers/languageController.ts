import LanguageModel from "@/models/Language";

export const POST = async (data: any) => {
  try {
    const language = await LanguageModel.create(data);
    return { success: true, data: language };
  } catch (error: any) {
    return {
      success: false,
      message: "Error creating language",
      error: error.message,
    };
  }
};

export const GET = async () => {
  try {
    const languages = await LanguageModel.find().sort({ createdAt: -1 });
    return { success: true, data: languages };
  } catch (error: any) {
    return {
      success: false,
      message: "Error fetching languages",
      error: error.message,
    };
  }
};
