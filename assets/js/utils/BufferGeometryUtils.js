import {
    TriangleFanDrawMode,
    TriangleStripDrawMode,
    TrianglesDrawMode
} from '../three/three.module.js';

function toTrianglesDrawMode( geometry, drawMode ) {
    if ( drawMode === TrianglesDrawMode ) {
        return geometry;
    }

    const index = geometry.getIndex();
    const position = geometry.getAttribute( 'position' );

    if ( index === null ) {
        const indices = [];
        for ( let i = 0, il = position.count; i < il; i ++ ) {
            indices.push( i );
        }
        geometry = geometry.clone();
        geometry.setIndex( indices );
    }

    const numberOfTriangles = index.count - 2;
    const newIndices = [];

    if ( drawMode === TriangleStripDrawMode ) {
        for ( let i = 0; i < numberOfTriangles; i ++ ) {
            const a = index.getX( i );
            const b = index.getX( i + 1 );
            const c = index.getX( i + 2 );

            if ( i % 2 === 0 ) {
                newIndices.push( a, b, c );
            } else {
                newIndices.push( b, a, c );
            }
        }
    } else if ( drawMode === TriangleFanDrawMode ) {
        for ( let i = 1; i <= numberOfTriangles; i ++ ) {
            const a = index.getX( 0 );
            const b = index.getX( i );
            const c = index.getX( i + 1 );

            newIndices.push( a, b, c );
        }
    } else {
        console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode() encountered an unknown drawMode:', drawMode );
        return geometry;
    }

    const newGeometry = geometry.clone();
    newGeometry.setIndex( newIndices );

    return newGeometry;
}

export { toTrianglesDrawMode };