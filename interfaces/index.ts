/* eslint-disable camelcase */
export interface IUserProfile {
  email: string
  is_superuser: boolean
  full_name: string
  uuid: string
  is_active: boolean
  phone_number: number
}

export interface IUserProfileUpdate {
  email?: string
  full_name?: string
  password?: string
  is_active?: boolean
  is_superuser?: boolean
  phone_number?: number
}

export interface IUserProfileCreate {
  email: string
  full_name: string
  password?: string
  is_superuser?: boolean
  phone_number?: number
  is_active?: boolean
}

export interface IUserOpenProfileCreate {
  email: string
  full_name: string
  password: string
  phone_number?: number
}
