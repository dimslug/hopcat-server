import React, { useEffect, useRef, useState } from 'react'
import { Table, Tooltip, Button, Collapse } from 'reactstrap'

function UpcomingPromos() {

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    const [isOpen, setIsOpen] = useState(false);
    const showMore = () => setIsOpen(!isOpen)

    const [status, setStatus] = useState(false);

    const onEntering = () => setStatus(true);
    const onEntered = () => setStatus(true);
    const onExiting = () => setStatus(false);
    const onExited = () => setStatus(false);

    // fetch promo data from backend and map over it to populate table

    const promoData = [];

    const fetchPromos = async () => {
        const url = 'http://localhost:4010/promo/upcoming';

        const requestOptions = {
            method: 'GET',
            headers: new Headers({
                "Authorization": `Bearer ${localStorage.getItem('token')}`,                
            })
        }

        try {
            const res = await fetch(url, requestOptions);
            const data = await res.json();
            console.log(data)
            promoData.push(data)
        } catch (err) {
            console.log(err.message)
        }

    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchPromos();
        }
    }, [localStorage.getItem('token')])






    return (
        <>
            <h2>Upcoming Events</h2>

            <Table
                hover
                borderless
                responsive
                size="sm"
            >
                <tbody>
                    <tr
                        id='target'
                    >
                        <td>Drink Name</td>
                        <td>Drink Description</td>
                        <td>Creator / Establishment</td>
                        <td>Promo Date/Time</td>
                        <Tooltip
                            isOpen={tooltipOpen}
                            target='target'
                            toggle={toggle}
                        > <img src="https://placehold.co/200" alt="" />
                        </Tooltip>
                    </tr>
                    <tr
                        id='target'
                    >
                        <td>Drink Name</td>
                        <td>Drink Description</td>
                        <td>Creator / Establishment</td>
                        <td>Promo Date/Time</td>
                        <Tooltip
                            isOpen={tooltipOpen}
                            target='target'
                            toggle={toggle}
                        > <img src="https://placehold.co/200" alt="" />
                        </Tooltip>
                    </tr>
                    <tr
                        id='target'
                    >
                        <td>Drink Name</td>
                        <td>Drink Description</td>
                        <td>Creator / Establishment</td>
                        <td>Promo Date/Time</td>
                        <Tooltip
                            isOpen={tooltipOpen}
                            target='target'
                            toggle={toggle}
                        > <img src="https://placehold.co/200" alt="" />
                        </Tooltip>
                    </tr>
                    <tr
                        id='target'
                    >
                        <td>Drink Name</td>
                        <td>Drink Description</td>
                        <td>Creator / Establishment</td>
                        <td>Promo Date/Time</td>
                        <Tooltip
                            isOpen={tooltipOpen}
                            target='target'
                            toggle={toggle}
                        > <img src="https://placehold.co/200" alt="" />
                        </Tooltip>
                    </tr>
                </tbody>
            </Table>
            <Button onClick={showMore} style={{ alignSelf: 'center' }} hidden={status}>
                Show More
            </Button>
            <Collapse
                onEntering={onEntering}
                onEntered={onEntered}
                onExiting={onExiting}
                onExited={onExited}
                isOpen={isOpen}>
                <Table
                    hover
                    responsive
                    borderless
                    size="sm"
                >
                    <tbody>
                        <tr
                            id='target'
                        >
                            <td>Drink Name</td>
                            <td>Drink Description</td>
                            <td>Creator / Establishment</td>
                            <td>Promo Date/Time</td>
                            <Tooltip
                                isOpen={tooltipOpen}
                                target='target'
                                toggle={toggle}
                            > <img src="https://placehold.co/200" alt="" />
                            </Tooltip>
                        </tr>
                        <tr
                            id='target'
                        >
                            <td>Drink Name</td>
                            <td>Drink Description</td>
                            <td>Creator / Establishment</td>
                            <td>Promo Date/Time</td>
                            <Tooltip
                                isOpen={tooltipOpen}
                                target='target'
                                toggle={toggle}
                            > <img src="https://placehold.co/200" alt="" />
                            </Tooltip>
                        </tr>
                        <tr
                            id='target'
                        >
                            <td>Drink Name</td>
                            <td>Drink Description</td>
                            <td>Creator / Establishment</td>
                            <td>Promo Date/Time</td>
                            <Tooltip
                                isOpen={tooltipOpen}
                                target='target'
                                toggle={toggle}
                            > <img src="https://placehold.co/200" alt="" />
                            </Tooltip>
                        </tr>
                        <tr
                            id='target'
                        >
                            <td>Drink Name</td>
                            <td>Drink Description</td>
                            <td>Creator / Establishment</td>
                            <td>Promo Date/Time</td>
                            <Tooltip
                                isOpen={tooltipOpen}
                                target='target'
                                toggle={toggle}
                            > <img src="https://placehold.co/200" alt="" />
                            </Tooltip>
                        </tr>
                    </tbody>
                </Table>
                <Button onClick={showMore} style={{ alignSelf: 'center' }} hidden={!status}>
                    Show Less
                </Button>
            </Collapse>



        </>
    )
}

export default UpcomingPromos