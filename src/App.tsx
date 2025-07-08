import { Counter, ContactForm, UserList } from '@/components';

const App = () => {
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-primary mb-4'>
            Welcome to React Testing with RTL
          </h1>
          <p className='text-lg text-base-content/70'>
            This app demonstrates various components perfect for testing scenarios
          </p>
        </div>
        <div className='grid gap-8 lg:grid-cols-4'>
          <div>
            <Counter initialValue={0} step={1} />
          </div>
          <div>
            <ContactForm />
          </div>
          <div className='lg:col-span-2'>
            <UserList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
