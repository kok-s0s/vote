import React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <link rel="manifest" href="/manifest.json" />
        <body className="dark:text-gray-100 dark:bg-gray-800 text-gray-800 bg-gray-200">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
