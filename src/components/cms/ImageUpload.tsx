import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

import { uploadFileToS3, deleteFileFromS3 } from '../../services/s3';

interface PanelState {
  image_url: string;
}

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void;
  onPanelDeleted: (imageUrl: string) => void;
  panels: PanelState[];
  category: 'diary' | 'fantology' | 'other works';
  title: string;
}

const ImageUpload = ({
  onImageUploaded,
  onPanelDeleted,
  panels,
  category,
  title,
}: ImageUploadProps) => {
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadFileToS3(file, category, title, panels.length + 1);
    onImageUploaded(imageUrl);
  };

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
      <label htmlFor="icon-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<PhotoCameraIcon />}
        >
          Upload Image
        </Button>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="icon-button-file"
          type="file"
          onChange={handleImageUpload}
        />
      </label>

      <List>
        {panels.map((panel, index) => (
          <ListItem key={panel.image_url}>
            <ListItemAvatar>
              <Avatar variant="rounded" src={panel.image_url} />
            </ListItemAvatar>
            <ListItemText
              primary={`Panel ${index + 1}`}
              secondary={panel.image_url}
              secondaryTypographyProps={{ style: { wordBreak: 'break-all' } }}
            />
            <Button
              onClick={() => handleDeleteClick(panel.image_url)}
              disabled={index !== panels.length - 1} // Disable the button unless it's the last one
            >
              <DeleteIcon />
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ImageUpload;
