import UserService from "@repo/services/user";
import FormService from "@repo/services/form";
import FormSubmissionService from "@repo/services/form_submission";

export const userService = new UserService();
export const formService = new FormService();
export const formSubmissionService = new FormSubmissionService();
