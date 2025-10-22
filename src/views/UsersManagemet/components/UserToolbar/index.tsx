import React, { useEffect, useState } from 'react';

import { useDebounce } from 'use-debounce';

import { Box } from '@mui/material';

import { SearchInput } from 'components/shared';

import { HttpStatusCode } from 'commons/global';

import { useUser } from '../../hooks';

const UserToolbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const { search, handleSearch, error } = useUser();

  useEffect(() => {
    handleSearch(debouncedSearch);
  }, [debouncedSearch, handleSearch]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2,
        gap: 2,
        flexWrap: 'wrap',
      }}
    >
      <SearchInput
        id="searchTerm"
        value={search}
        onChange={setSearchTerm}
        placeholder="Buscar por nombre o email..."
        disabled={!!error && error.status !== HttpStatusCode.NotFound}
      />
    </Box>
  );
};

export default UserToolbar;
