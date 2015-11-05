

export default function (model) {

  return () => model.all()
    .then((instances) => 
      instances.map((instance) => instance.toJSON()));

}