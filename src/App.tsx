import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as R from './Routes';
import { AuthProvider } from '@/providers/auth-provider.tsx';
import ProtectedRoute from '@/middleware/protected-route.tsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/*public routes*/}
          <Route path="/" element={<R.WelcomePage />} />

          {/*auth routes*/}
          <Route path="/auth/sign-in" element={<R.LoginPage />} />
          <Route path="/auth/sign-up" element={<R.RegisterPage />} />

          {/*admin routes*/}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="admin">
              <Route path="dashboard" element={<R.DashboardPage />} />

              <Route path="categories" element={<R.AdminCategoriesPage />} />
              <Route path="categories/create" element={<R.AdminCreateCategory />} />

              <Route path="products" element={<R.AdminProductsPage />} />
              <Route path="products/create" element={<R.AdminCreateProductPage />} />
            </Route>
          </Route>

          {/*customer routes*/}
          <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
            <Route path="/home" element={<R.HomePage />} />
          </Route>

          <Route path="*" element={<R.NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
