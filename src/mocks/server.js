import { setupServer, handlers } from 'msw';

export const server = setupServer(...handlers);