import React from 'react';
import FilterControls from './common/filterControl';
import Sidebar from './sidebar';
import Card from './common/cards';

const Section = (props) => {

    return ( 
        <React.Fragment>
            <FilterControls />

            <div id='section-holder'>
                <Sidebar />
                <section>
                <Card />
                </section>
            </div>
        </React.Fragment>
     );
}
 
export default Section;