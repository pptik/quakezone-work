# Content Type

## Sample Query

```gql
{
  contentTypesDynamic {
    uid
    name
    apiID
    label
    isDisplay
    schema {
      modelType
      connection
      collectionName
      kind
    }
  }
}
```
