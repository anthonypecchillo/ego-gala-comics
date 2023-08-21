import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { SelectChangeEvent } from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ImageUpload from './ImageUpload';
import Grid from '@mui/material/Grid';

interface ComicFormProps {
  initialComic?: ComicFormState;
  onSubmit: (comic: ComicFormState) => void;
}

interface PanelState {
  image_url: string;
}

interface ComicFormState {
  title: string;
  category: 'diary' | 'fantology' | 'compendium';
  description: string;
  publication_date: Date;
  panels: PanelState[];
}

const formatDate = (date: Date): string => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

const ComicForm: React.FC<ComicFormProps> = ({ onSubmit }) => {
  const [comic, setComic] = useState<ComicFormState>({
    title: '',
    category: 'diary',
    description: '',
    publication_date: new Date(),
    panels: [],
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setComic((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setComic((prev) => ({ ...prev, publication_date: date }));
    }
  };

  const handleImageUploaded = (imageUrl: string) => {
    setComic((prev) => ({
      ...prev,
      panels: [...prev.panels, { image_url: imageUrl }],
    }));
  };

  const handleCategoryChange = (
    event: SelectChangeEvent<'diary' | 'fantology' | 'compendium'>,
  ) => {
    const category = event.target.value as string;

    if (['diary', 'fantology', 'compendium'].includes(category)) {
      setComic((prev) => ({
        ...prev,
        category: category as 'diary' | 'fantology' | 'compendium',
      }));
    } else {
      console.error('Invalid category value:', category);
    }
  };

  const handleSubmit = () => {
    // Add some validation here?
    onSubmit(comic);
  };

  useEffect(() => {
    if (comic.category === 'diary') {
      const formattedDate = formatDate(comic.publication_date);
      setComic((prev) => ({ ...prev, title: formattedDate, description: '' }));
    } else {
      setComic((prev) => ({ ...prev, title: '', description: '' }));
    }
  }, [comic.category, comic.publication_date]);

  return (
    <Grid container spacing={3} direction="column" alignItems="stretch">
      <Grid container item spacing={3}>
        <Grid item xs={7}>
          <FormControl fullWidth>
            <InputLabel htmlFor="comic-category">Category</InputLabel>
            <Select
              value={comic.category}
              onChange={handleCategoryChange}
              label="Category"
              inputProps={{
                name: 'category',
                id: 'comic-category',
              }}
            >
              <MenuItem value="diary">Diary</MenuItem>
              <MenuItem value="fantology">Fantology</MenuItem>
              <MenuItem value="compendium">Compendium</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={5} container justifyContent="flex-end">
          <DatePicker
            label="Publication Date"
            value={comic.publication_date}
            onChange={handleDateChange}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={comic.title}
          onChange={handleInputChange}
          disabled={comic.category === 'diary'}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={comic.description}
          onChange={handleInputChange}
          multiline
          rows={4}
          disabled={comic.category === 'diary'}
        />
      </Grid>

      <Grid item xs={12}>
        <ImageUpload
          onImageUploaded={handleImageUploaded}
          panels={comic.panels}
        />
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default ComicForm;
