declare module "textblob" {
  export class TextBlob {
    constructor(text: string)
    sentiment: {
      polarity: number
      subjectivity: number
    }
  }
}
