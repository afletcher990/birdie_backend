import app from './application';
import FakeData from './data/fakeData';

const port = process.env.PORT || 8000;

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${port}`);

  FakeData.setupFakeData();
});
