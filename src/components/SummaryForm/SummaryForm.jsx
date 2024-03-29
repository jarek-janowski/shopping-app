import { useState } from 'react';
import { Popover, Form, Button, OverlayTrigger } from 'react-bootstrap'

const SummaryForm = () => {

    const [tcChecked, setTcChecked] = useState(false);

    const popover = (
        <Popover id="popover-basic">
            <Popover.Content>
                No ice cream will actually be delivered
            </Popover.Content>
        </Popover>
    )

    const checkboxLabel = (
        <span>
            I agree to 
            <OverlayTrigger placement="right" overlay={popover}>
                <span style={{color: 'blue'}}> Terms and Conditions</span>
            </OverlayTrigger>
        </span>
    )

    const handleCheckbox = () => {
        setTcChecked(!tcChecked)
    }

    return ( 
        <Form>
            <Form.Group controlId="terms-and-conditions">
                <Form.Check
                    type="checkbox"
                    checked={tcChecked}
                    label={checkboxLabel}
                    onChange={handleCheckbox}
                />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!tcChecked}>
                Confirm order
            </Button>
        </Form>
     );
}
 
export default SummaryForm;