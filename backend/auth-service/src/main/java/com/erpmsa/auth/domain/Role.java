package com.erpmsa.auth.domain;

import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.Set;

public enum Role {
    USER(Set.of(
            "hr:read"
    )),
    MANAGER(union(USER.permissions, Set.of(
            "hr:write",
            "inventory:read",
            "accounting:read"
    ))),
    ADMIN(union(MANAGER.permissions, Set.of(
            "inventory:write",
            "accounting:write",
            "admin:read",
            "admin:write"
    )));

    private final Set<String> permissions;

    Role(Set<String> permissions) {
        this.permissions = Collections.unmodifiableSet(permissions);
    }

    public Set<String> permissions() {
        return permissions;
    }

    private static Set<String> union(Set<String> base, Set<String> additions) {
        Set<String> result = new LinkedHashSet<>(base);
        result.addAll(additions);
        return result;
    }
}

