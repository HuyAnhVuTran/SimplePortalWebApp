package com.gamergate.backend.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class passwordencoder {
    private BCryptPasswordEncoder encodeagent= new BCryptPasswordEncoder();

    public String encode(String pass){

        return encodeagent.encode(pass);
    }

    public boolean compare(String inputPass, String encoded){
        return encodeagent.matches(inputPass,encoded);
    }
}
