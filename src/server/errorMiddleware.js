import {AppError} from './errors';

export default function() {
  return (err, req, res, next) => {
    switch (err.name) {
      case 'RequestError':
        res.status(err.status || 400).json(err);
        break;
      case 'AuthorizationError':
        res.status(err.status || 401).json(err);
        break;
      case 'UnauthorizedError':
        res.status(err.status || 401).json(err);
        break;
      case 'AuthenticationError':
        res.status(err.status || 403).json(err);
        break;
      case 'NotFoundError':
        res.status(err.status || 404).json(err);
        break;
      case 'AppError':
        res.status(err.status || 500).json(err);
        break;
      default:
        console.error(err.stack);
        const error = new AppError('Something went wrong.');
        res.status(err.status || 500).json(error);
    }
  };
}
