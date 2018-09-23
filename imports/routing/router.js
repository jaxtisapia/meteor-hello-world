import App from '/imports/ui/App.jsx'; // or the place where you have your main entry component
import '/imports/ui/styles/main.scss'
import '/imports/ui/styles/uikit/uikit.min.css'
import { createRouter } from 'meteor/cultofcoders:meteor-react-routing';

export default createRouter(App); // App is the main entry component for your routes