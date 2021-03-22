import React from 'react';
import { HeaderNav } from '../../components/partials/HeaderNav';
import { Footer } from '../../components/partials/Footer';

export const PersonalInformationContainer = () => {
    return (
        <>
            <HeaderNav />
            <div className="cart-page">
                <div className="container-fluid">
                    <div className="row row-wrapper">
                        <div className="col-md-4">
                            <h1>Account</h1>
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" data-toggle="tab" href="#home" role="tab" aria-controls="home">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#profile" role="tab" aria-controls="profile">Profile</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#messages" role="tab" aria-controls="messages">Messages</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#settings" role="tab" aria-controls="settings">Settings</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-8">
                            <h1>Personal Information</h1>
                            <div class="tab-content">
                                <div class="tab-pane active" id="home" role="tabpanel">1</div>
                                <div class="tab-pane" id="profile" role="tabpanel">..2.</div>
                                <div class="tab-pane" id="messages" role="tabpanel">.3..</div>
                                <div class="tab-pane" id="settings" role="tabpanel">.4..</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}