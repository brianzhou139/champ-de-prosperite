// Create a separate component which will load RichTextEditor only in browser
import type { RichTextEditorProps } from '@mantine/rte';
// RichText.tsx in your components folder
import dynamic from 'next/dynamic';

export default dynamic(() => import('@mantine/rte'), {
  // Disable during server side rendering
  ssr: false,

  // Render anything as fallback on server, e.g. loader or html content without editor
  loading: () => null,
});

export function RichText(props: RichTextEditorProps) {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line import/extensions, global-require
    const { RichTextEditor } = require('@mantine/rte');
    return <RichTextEditor {...props} />;
  }

  // Render anything as fallback on server, e.g. loader or html content without editor
  return null;
}
