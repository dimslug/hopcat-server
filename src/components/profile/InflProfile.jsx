import React from 'react'

import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

function ProfileForm() {
    return (
        <Form>
            <FormGroup>
                <Label for="name">Name:</Label>
                <Input type="text" name="name" id="name" placeholder="Enter your name" />
            </FormGroup>
            <FormGroup>
                <Label for="email">Email:</Label>
                <Input type="email" name="email" id="email" placeholder="Enter your email" />
            </FormGroup>
            <FormGroup>
                <Label for="bio">Bio:</Label>
                <Input type="textarea" name="bio" id="bio" placeholder="Enter your bio" />
            </FormGroup>
            <FormGroup>
                <Label for="avatar">Avatar:</Label>
                <Input type="file" name="avatar" id="avatar" accept="image/*" />
            </FormGroup>
            <Button color="primary" type="submit">Save</Button>
        </Form>
    );
}

export default 