import { isAxiosError } from "axios";
import instance from "../api/axios";

interface User {
  idNumber: string;
  firstName: string;
  lastName: string;
  type: "Student" | "Staff" | "Admin";
  password?: string;
  parkingSlot?: null;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface StickerApplication {
  applicationId: number;
  carMake: string;
  carModel: string;
  carColor: string;
  submissionDate: string;
  status: number;
  user: User;
  parkingSticker: ParkingSticker | null;
}

interface ParkingSticker {
  stickerId: number;
  carMake: string;
  carModel: string;
  carColor: string;
  issueDate: string;
  expiryDate: string;
  status: number;
  user: User;
  stickerApplication: StickerApplication;
  parkingSlot?: null;
}

interface StickerApplicationSubmission {
  carMake: string;
  carModel: string;
  carColor: string;
}

// Admin credentials - in a real app, these would be in a secure environment variable
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123"; // This should be properly hashed in production

export const loginUser = async (
  idNumber: string,
  password: string
): Promise<LoginResponse> => {
  try {
    // Check if this is an admin login attempt
    if (idNumber === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return {
        token: "admin-jwt-token",
        user: {
          idNumber: "ADMIN",
          firstName: "System",
          lastName: "Administrator",
          type: "Admin",
        },
      };
    }

    // Regular user login
    const response = await instance.get<User>(`/users/${idNumber}`);
    const user = response.data;

    if (!user) {
      throw new Error("User not found");
    }

    // Verify password
    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    // Return token and user data (excluding password)
    return {
      token: "mock-jwt-token",
      user: {
        idNumber: user.idNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        type: user.type,
      },
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      throw new Error("User not found");
    }
    throw error;
  }
};

export const registerUser = async (userData: {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  idNumber: string;
  type: string;
}) => {
  const response = await instance.post("/users", userData);
  return response.data;
};

export const submitStickerApplication = async (
  applicationData: StickerApplicationSubmission,
  userId: string
) => {
  const response = await instance.post(
    `/stickerApplication/postStickerApplication/${userId}`,
    applicationData
  );
  return response.data;
};

export const getStickerApplications = async (): Promise<
  StickerApplication[]
> => {
  const response = await instance.get("/stickerApplication/");
  return response.data;
};

export const updateApplicationStatus = async (
  id: number,
  application: StickerApplication
): Promise<StickerApplication> => {
  if (application.status === 1) {
    // For approval, use the specific approval endpoint
    const response = await instance.put(
      `/stickerApplication/approveStickerApplication/${id}`
    );
    return response.data;
  } else {
    // For other status updates (like decline), use the general update endpoint
    const response = await instance.put(
      `/stickerApplication/declineStickerApplication/${id}`
    );
    return response.data;
  }
};
