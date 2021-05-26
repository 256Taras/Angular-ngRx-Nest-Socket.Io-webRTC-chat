import {Module} from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {FileModule} from "../file/file.module";

@Module({
    imports: [
        JwtModule.register({
            secret: 'secret',
            signOptions: {expiresIn: '1d'},
        }),
        FileModule
    ],
    exports: [
        JwtModule,
        FileModule
    ]
})
export class SharedModule {
}
