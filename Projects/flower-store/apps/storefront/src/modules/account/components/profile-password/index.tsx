"use client"

import React, { useEffect, useActionState } from "react";
import Input from "@modules/common/components/input"
import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"
import { updateCustomerPassword } from "@lib/data/customer"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfilePassword: React.FC<MyInformationProps> = (_customer) => {
  const [successState, setSuccessState] = React.useState(false)

  const updatePassword = async (
    _currentState: Record<string, unknown>,
    formData: FormData
  ) => {
    return updateCustomerPassword(_currentState, formData)
  }

  const [state, formAction] = useActionState(updatePassword, {
    error: null as string | null,
    success: false,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  return (
    <form action={formAction} className="w-full overflow-visible" onReset={() => clearState()}>
      <AccountInfo
        label="Password"
        currentInfo={
          <span>The password is not shown for security reasons</span>
        }
        isSuccess={successState}
        isError={!!state?.error}
        errorMessage={state.error || undefined}
        clearState={clearState}
        data-testid="account-password-editor"
      >
        <div className="grid grid-cols-1 gap-y-2 items-start w-full">
          <Input
            label="Old password"
            name="old_password"
            required
            type="password"
            autoComplete="current-password"
            data-testid="old-password-input"
          />
          <Input
            label="New password"
            type="password"
            name="new_password"
            required
            autoComplete="new-password"
            data-testid="new-password-input"
          />
          <Input
            label="Confirm password"
            type="password"
            name="confirm_password"
            required
            autoComplete="new-password"
            data-testid="confirm-password-input"
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfilePassword