import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { updateCustomerPasswordStep } from "./steps"

type UpdateCustomerPasswordWorkflowInput = {
  entity_id: string
  old_password: string
  new_password: string
}

export const updateCustomerPasswordWorkflow = createWorkflow(
  "update-customer-password",
  function (input: UpdateCustomerPasswordWorkflowInput) {
    return new WorkflowResponse(updateCustomerPasswordStep(input))
  }
)