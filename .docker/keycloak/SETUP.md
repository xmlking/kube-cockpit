KeyCloak
========
DIY KeyCloak setup and LDAP configuration 

### Start
```bash
docker-compose up keycloak
```
> http://localhost:9080/auth   [admin:admin] 

### Config
> After fresh Keycloak installation, Import [realm-export](./realm-export.json) or follow instructions below. 

1. Add `kubernetes` realm. Then switch to `kubernetes` realm.
2. Create client `cockpit` with `openid-connect` Protocol
    ```
    Implicit Flow Enabled: Enabled
    Valid Redirect URIs: http://localhost:4200/*
    Base URL: http://localhost:4200
    Web Origins: http://localhost:4200
    ```
    add a Role `ROLE_USER` to `cockpit` client.
    Clients > kube > Roles > ROLE_USER
    
3. Add Local User `Manage > Users > Add User`
    ```
    Username: sumo
    Email: sumo@demo.com
    First Name: sumo
    Last Name: demo
    ```
> Under `Conditional`, reset password to `demo`, uncheck `Temporary`

3. Add LDAP user federation provider
    ``` 
    Import Users: off
    Edit Mode: READ_ONLY
    Vendor: Active Directory
    Username LDAP attribute: sAMAccountName
    Connection URL: ldap://myldap.mycompany.com
    Users DN: CN=Users,DC=ds,DC=mycompany,DC=com
    Authentication Type: simple
    Bind DN: cn=et_ose,cn=users,dc=ds,dc=mycompany,dc=com
    Bind Credentia: xxx
    ```
4. Create new `given name` under `LDAP Mappers`
    ``` 
    Name: given name
    Mapper Type: user-attribute-ldap-mapper
    User Model Attribute: firstName
    LDAP Attribute: givenName
    Read Only: On
    ```
5. Create new `telephone number` under `LDAP Mappers`
    ``` 
    Name: telephone number
    Mapper Type: user-attribute-ldap-mapper
    User Model Attribute: telephoneNumber
    LDAP Attribute: telephoneNumber
    Read Only: On
    ```
6. Create new `roles` under `LDAP Mappers`

    > User Federation >  Ldap > LDAP Mappers > Create LDAP mapper

    ``` 
    Name: roles
    Mapper Type: role-ldap-mapper
    LDAP Roles DN: cn=Users,dc=ds,dc=mycompany,dc=com
    Role Name LDAP Attribute: cn
    Role Object Classes: group
    Membership LDAP Attribute: member
    Membership User LDAP Attribute: sAMAccountName
    Member-Of LDAP Attribute: memberOf
    Client ID: cockpit
    ```

7. create `roles` for `cockpit` client
    > Clients > cockpit > Roles

  * ROLE_USER
  * ROLE_ADMIN

 
8. Add new `telephone number` for `cockpit` client Mappers

    > Clients > cockpit > Mappers > telephone number

    ```
    Name: telephone number
    Mapper Type: User Attribute
    User Attribute: telephoneNumber
    Token Claim Name: telephone_number
    Claim JSON Type: String
    ```
 
9. Add `OSFI_ADMIN To Admin` for `cockpit` client Mappers

    > Clients > cockpit > Mappers > seset to admin

    ```
    Name:  K8S_ADMIN to admin
    Mapper Type: Role Name Mapper
    Role: K8S_ADMIN
    New Role Name: ROLE_ADMIN
    ```

10. Turn off `Full Scope Allowed`

    > Under Clients > kube > Scope
    
    Turn off `Full Scope Allowed` for `cockpit` client and select few Realm Roles

