
import axios from 'axios';

const DOCUMENT_READER_URL =
  import.meta.env.VITE_DOCUMENT_READER_URL ||
  'http://127.0.0.1:8001';

const documentApi = axios.create({
  baseURL: DOCUMENT_READER_URL,
});

export async function extractDocument(file, onProgress) {
  const form = new FormData();
  form.append('file', file);

  // 1. Upload document
  const uploadResponse = await documentApi.post(
    '/upload',
    form,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },

      onUploadProgress: (event) => {
        if (event.total && onProgress) {
          onProgress(
            Math.round(
              (event.loaded / event.total) * 30
            )
          );
        }
      },
    }
  );

  const uploadData = uploadResponse.data;

  const documentId = uploadData.document_id;

  if (!documentId) {
    throw new Error(
      'Document Reader did not return a document ID.'
    );
  }

  // 2. Poll the document until AI extraction is available
  for (let attempt = 0; attempt < 120; attempt++) {
    const response = await documentApi.get(
      `/documents/${documentId}`
    );

    const document = response.data;

    // extracted_data already exists in your current backend
    if (document.extracted_data) {
      if (onProgress) {
        onProgress(100);
      }

      return normaliseDocument(document);
    }

    if (
      document.status === 'failed' ||
      document.status === 'error'
    ) {
      throw new Error(
        'Document processing failed.'
      );
    }

    if (onProgress) {
      onProgress(
        Math.min(30 + attempt * 0.6, 95)
      );
    }

    await new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );
  }

  throw new Error(
    'Timed out waiting for AI document extraction.'
  );
}

function normaliseDocument(document) {
  let extracted = document.extracted_data;

  // Your backend currently returns extracted_data
  // as a JSON string.
  if (typeof extracted === 'string') {
    try {
      extracted = JSON.parse(extracted);
    } catch {
      extracted = {
        fields: {},
        summary: extracted,
      };
    }
  }

  const fields =
    extracted?.fields &&
    typeof extracted.fields === 'object'
      ? extracted.fields
      : {};

  return {
    documentId: document.id,
    filename: document.original_filename,
    documentType:
      extracted?.document_type ||
      document.document_type ||
      'Unknown',

    confidence:
      extracted?.confidence ??
      extracted?.confidence_score ??
      null,

    fields,

    summary:
      extracted?.summary ||
      '',

    rawText:
      document.raw_text ||
      '',

    status: document.status,
  };
}

export async function saveExtractedRecord(fields) {
  throw new Error(
    'Save endpoint is not implemented by the Document Reader backend yet.'
  );
}

