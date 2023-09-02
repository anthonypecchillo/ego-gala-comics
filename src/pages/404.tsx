import Link from 'next/link';
import Image from 'next/image';
import Paper from '@mui/material/Paper';

export default function Custom404() {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        my: 5,
        mx: 'auto',
        maxWidth: 'md',
        textAlign: 'center',
      }}
    >
      <h1>Oh no, 404!</h1>
      <Image
        src={'/404.jpg'}
        alt="404"
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '600px',
          border: '0px solid black',
        }}
        width={5412}
        height={7517}
      />
      <p>This is probably your fault.</p>
      <Link href="/">Go back home?</Link>
      <br />
      <br />
    </Paper>
  );
}
