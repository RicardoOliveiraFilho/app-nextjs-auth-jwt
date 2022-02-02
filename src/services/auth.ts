import { v4 as uuid } from 'uuid'

type SignInRequestData = {
  email: string;
  password: string;
}

type User = {
  name: string;
  email: string;
  avatar_url: string;
}

type SignInRequestReturn = {
  token: string;
  user: User;
}

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export async function signInRequest(data: SignInRequestData): Promise<SignInRequestReturn> {
  await delay()

  return {
    token: uuid(),
    user: {
      name: 'Diego Fernandes',
      email: 'diego@rocketseat.com.br',
      avatar_url: 'https://github.com/diego3g.png'
    }
  }
}

export async function recoverUserInformation() {
  await delay()

  return {
    user: {
      name: 'Diego Fernandes',
      email: 'diego@rocketseat.com.br',
      avatar_url: 'https://github.com/diego3g.png'
    }
  }
}