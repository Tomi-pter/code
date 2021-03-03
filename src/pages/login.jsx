import React from 'react';
import { Header } from '../components/partials/header';
import { Footer } from '../components/partials/footer';

export const Login = () => {
  return (
    <>
        <Header />
        <div className="container-fluid login">
            <div className="container d-flex align-items-center justify-content-end">
                <div className="card mb-0">
                    <div className="card-body">
                        <h3 className="text-center">Log in</h3>
                        <h4 className="text-center">Lorem Ipsum</h4>
                        <form className="text-right">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn">Log in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
  );
};
