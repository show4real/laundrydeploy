import React, { Component } from 'react'

import styled from 'styled-components'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const GalleryStyles = styled.div`
    .gallery__grid {
        display: grid;
        gap: 2rem;
        grid-auto-flow: dense;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
        justify-content: center;
    }
    .gallery__title {
        font-size: 2rem;
        padding: 1rem;
        text-align: center;
    }
    .item {
        min-width: 200px;
        width: 260px;
        margin: auto;
        border: 3px solid var(--gray-1);
        padding: 1rem;
    }
    .item__btns {
        display: flex;
        justify-content: space-between;
        button {
            font-size: 1.125rem;
            background-color: var(--gray-1);
            padding: 0.2rem 0.5rem;
            height: 3rem;
            border-radius: 8px;
            font-weight: bolder;
        }
    }
    .item-img {
        width: 140px;
        height: 140px;
        margin: auto;
        margin-bottom: 1rem;
        img {
            object-fit: contain;
        }
    }
    .item-title {
        font-size: 1rem;
        height: 82px;
        text-align: center;
        margin-bottom: 1rem;
    }
    .item-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
    }
    .item-rating {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1rem;
        width: 60px;
    }
    .item__btnadd {
        border: 2px solid var(--red-1);
        color: var(--red-1)
    }
    .item-price{
        font-size: 2.5rem;
        color: var(--blue-1);
        text-align: center;
        margin-bottom: 1rem;
    }
    .item__btnbuy {
        border: 2px solid var(--red-1);
        background-color: var(--red-1)!important;
        color: var(--gray-1);
    }
    .item-start{
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 1px solid yellow;
        svg {
        font-size: 1rem;
        }
    }
    .skeleton {
        margin-bottom: 1rem;
    }
`

export class Placeholder extends Component {
    constructor(props) {
        super(props);
       
    }

     rows = () =>{
        let rows = []
        for (let index = 0; index < 6; index++) {
            rows.push(
               <div className='col-md-3'>
                  <article className='item'>
                        <div className='item-img'>
                            <Skeleton width={140} height={140} />
                        </div>
                        <h3 className='item-title'><Skeleton  width={160} height={20} count={2}/></h3>
                        {/* <h3 className='item-title'> <Skeleton style={{display:'inline-flex'}} width={140} height={20} />
                            <Skeleton style={{display:'inline-flex'}}width={30} height={20} />
                            <Skeleton style={{display:'inline-flex'}}width={22} height={22} circle={true} /></h3>
                       
                        
                        <div style={{display:'inline-flex'}}>
                       
                        </div> */}
                       
                    </article>
               </div>
            )
        }
        return rows
       
    }

  render() {
    return (
        <SkeletonTheme color='#F5F5F5' highlightColor='#ffffff'>
        <GalleryStyles className='gallery__grid'>
            {/* <h2 className='gallery__title'><Skeleton /></h2> */}
            <div className='gallery__grid'>
                {this.rows()}
            </div>
        </GalleryStyles>
    </SkeletonTheme>
    )
  }
}

export default Placeholder