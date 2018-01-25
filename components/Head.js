import Head from 'next/head'

export default () => (
  <Head>
    <title>Zonetime</title>
    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    <link rel='stylesheet' type='text/css' href='/static/style.css' />
    <style>{`
      html {
        background: #efefef;
        color: #333;
        font-family: sans-serif;
      }
    `}</style>
  </Head>
)
