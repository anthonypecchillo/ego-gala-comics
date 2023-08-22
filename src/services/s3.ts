async function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export async function uploadFileToS3(
  file: File,
  category: string,
  title: string,
  panelNumber: number,
): Promise<string> {
  const base64Data = await convertFileToBase64(file);

  const response = await fetch('/api/cms/uploadToS3', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fileData: base64Data,
      fileType: file.type,
      category,
      title,
      panelNumber,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to upload to S3');
  }

  const data = await response.json();
  return data.fileURL;
}

export async function deleteFileFromS3(imageUrl: string): Promise<void> {
  await fetch('/api/cms/deleteFromS3', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageUrl }),
  });
}
