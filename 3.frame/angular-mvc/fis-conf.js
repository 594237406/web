fis.config.merge({
    modules : {
        parser : {
            less : ['less']
        },
        deploy : ['default', 'zip', 'tar']
    },
    roadmap : {
        ext : {
            less : 'css'
        },
        path : [
            {
                reg : /(server\.conf)$/i,
                release : 'config/$1'
            },
            {
                reg : /build\.sh$/i,
                release : false
            },
            {
                reg : /map\.json$/i,
                release : false
            },
            {
                reg : /\/(test\/.*)/i,
                release : '$1'
            },
            {
                reg : /(.*\.(?:js|css|less|scss|html|jpg|png))$/i,
                useStandard : false,
                release : '$1'
            }
        ]
    }
});

fis.config.set("settings.deploy.tar", {
    publishtar : {
        to : '/',
        gzip : true,
        level : 9,
        memLevel : 9,
        file : './output/output.tar.gz'
    }
});

fis.config.set("settings.deploy.zip", {
    publishzip : {
        to : '/',
        // server.conf 和 test文件夹不需要打包
        exclude : /server\.conf|\/test\//i,
        file : './output/push-1.0.11-qa.zip'
    }
});