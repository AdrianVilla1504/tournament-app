import {NextResponse} from "next/server";

export function GET(){
    return NextResponse.json({
        message: "Getting tournaments..."
    })
}

export function POST(){
    return NextResponse.json({
        message: "Creating tournament..."
    })
}