# Pasteur Analysis Frontend

Frontend for Pasteur's analytic functions. Built using the React Framework.

The Server backend is required for app to function, but can be ran separately for development purposes.

This is linked to the main application as a submodule.

Note: the backend will load the files from the build folder, which is pushed to the repo.
This does not need to be built unless there is a change, in which case, build and push the new build folder.

## Running and building

For development use
```
npm start
```

For production(or just to build a version for the backend to load) use
```
npm run build
```