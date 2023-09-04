import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import ImageUpload from './ImageUpload';
import { createComic } from '../../services/comics';

interface PanelState {
  image_url: string;
  panel_number: number;
}

interface ComicFormState {
  title: string;
  category: 'diary' | 'fantology' | 'compendium';
  description: string;
  publication_date: Date;
  panels: PanelState[];
}

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString(undefined, options);
};

const ComicForm = () => {
  const [comic, setComic] = useState<ComicFormState>({
    title: '',
    category: 'diary',
    description: '',
    publication_date: new Date(),
    panels: [],
  });

  const handleCategoryChange = (event: SelectChangeEvent<'diary' | 'fantology' | 'compendium'>) => {
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

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setComic((prev) => ({ ...prev, publication_date: date }));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setComic((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUploaded = (imageUrl: string) => {
    // Find the max panel number (or 0 if no panels exist)
    const maxPanelNumber = Math.max(0, ...comic.panels.map((panel) => panel.panel_number));
    setComic((prev) => ({
      ...prev,
      panels: [
        ...prev.panels,
        {
          image_url: imageUrl,
          panel_number: maxPanelNumber + 1,
        },
      ],
    }));
  };

  const handlePanelDeleted = (imageUrl: string) => {
    setComic((prev) => ({
      ...prev,
      panels: prev.panels
        .filter((panel) => panel.image_url !== imageUrl)
        .map((panel, idx) => ({
          ...panel,
          panel_number: idx + 1,
        })),
    }));
  };

  const validateSubmission = (): boolean => {
    // Validation
    if (!comic.title) {
      console.error('Title is required.');
      // TODO: set an error state variable here to show an error message in the UI.
      return false;
    }

    if (!comic.category) {
      console.error('Category is required.');
      // TODO: set an error state variable here to show an error message in the UI.
      return false;
    }

    if (!comic.publication_date) {
      console.error('Publication date is required.');
      // TODO: set an error state variable here to show an error message in the UI.
      return false;
    }

    if (!comic.panels || comic.panels.length === 0 || !comic.panels[0].image_url) {
      console.error('At least one panel with an image URL is required.');
      // TODO: set an error state variable here to show an error message in the UI.
      return false;
    }

    // All validations have passed
    return true;
  };

  const handleSubmit = async () => {
    const isValidSubmission = validateSubmission();

    if (isValidSubmission) {
      const response = await createComic(comic);
      if (response.success) {
        // eslint-disable-next-line no-console
        console.log('SUCCESS!');
      } else {
        console.error('Error submitting comic:', response.error);
      }
    }
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
          <FormControl fullWidth required>
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
          required
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
          onPanelDeleted={handlePanelDeleted}
          panels={comic.panels}
          category={comic.category}
          title={comic.title}
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
