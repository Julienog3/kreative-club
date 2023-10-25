import { defineTextStyles } from "@pandacss/dev";

export const textStyles = defineTextStyles({
  title: {
    description: 'The body text style - used in paragraphs',
    value: {
      fontFamily: 'Lexend Mega',
      fontWeight: '700',
      fontSize: '3rem',
      letterSpacing: '-.6rem',
      textDecoration: 'None',
      textTransform: 'None'
    }
  },
  body: {
    description: 'The body text style - used in paragraphs',
    value: {
      fontFamily: 'Lexend',
      fontWeight: '400',
      fontSize: '16',
      letterSpacing: '0',
      textDecoration: 'None',
      textTransform: 'None'
    }
  }
})