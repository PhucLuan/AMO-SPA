import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import TheContent from '../Content/TheContent'
import TheHeader from '../Header/TheHeader'
import TheSidebar from '../Sidebar/TheSidebar'

const TheLayout = () => {
    return (
        <div className="Layout">
            <TheHeader />
            <Container>
                <Row>
                    <Col md={3}>
                        <TheSidebar />
                    </Col>
                    <Col md={9}>
                        <TheContent />
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default TheLayout
