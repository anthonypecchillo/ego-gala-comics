import React from 'react';
import Button from '@mui/material/Button';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { uploadToS3 } from '../../services/s3';

interface PanelState {
  image_url: string;
}

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void;
  panels: PanelState[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUploaded,
  panels,
}) => {
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadToS3(file);
    onImageUploaded(imageUrl);
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
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ImageUpload;
