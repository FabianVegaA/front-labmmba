type Next = (result: any) => void | Promise<void>;

type Middleware = (req: any, res: any, next: Next) => any;

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export default function initMiddleware(middleware: Middleware) {
  return (req: any, res: any): Promise<any> =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}
