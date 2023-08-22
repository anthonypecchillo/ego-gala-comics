import React from 'react';
import Button from '@mui/material/Button';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import { uploadFileToS3, deleteFileFromS3 } from '../../services/s3';

interface PanelState {
  image_url: string;
}

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void;
  onPanelDeleted: (imageUrl: string) => void;
  panels: PanelState[];
  category: 'diary' | 'fantology' | 'compendium';
  title: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUploaded,
  onPanelDeleted,
  panels,
  category,
  title,
}) => {
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadFileToS3(
      file,
      category,
      title,
      panels.length + 1,
    );
    onImageUploaded(imageUrl);
  };

  function extractS3KeyFromUrl(url: string): string {
    const match = url.match(/amazonaws\.com\/(.+)$/);
    return match ? match[1] : '';
  }

  const handleDeleteClick = async (imageUrl: string) => {
    try {
      await deleteFileFromS3(imageUrl);

      onPanelDeleted(imageUrl);
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  };

  return (
    <div>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="icon-button-file"
        type="file"
        onChange={handleImageUpload}
      />
      <label htmlFor="icon-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<PhotoCameraIcon />}
        >
          Upload Image
        </Button>
      </label>
      <List>
        {panels.map((panel, idx) => (
          <ListItem key={idx}>
            <ListItemAvatar>
              <Avatar variant="rounded" src={panel.image_url} />
            </ListItemAvatar>
            <ListItemText
              primary={`Panel ${idx + 1}`}
              secondary={panel.image_url}
              secondaryTypographyProps={{ style: { wordBreak: 'break-all' } }}
            />
            <Button onClick={() => handleDeleteClick(panel.image_url)}>
              <DeleteIcon />
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ImageUpload;
