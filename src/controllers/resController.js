import Food from "../models/food.js"
import initModels from "../models/init-models.js"
import sequelize from "../models/connect.js"
import { response } from "../configs/response.js"

const model = initModels(sequelize)

const getFood = async (req, res) => {
    let data = await model.food.findAll()
    response(res, data, "Thành công", 200)
}

const likeDislike = async (req, res) => {
    try {
        const {user_id, date_like, res_id} = req.body

        const resExist = await model.restaurant.findOne({
            where: {
                res_id
            }
        })

        if (!resExist) return res.status(400).json({ message: "Restaurant không tồn tại!" })

        const likeExist = await model.like_res.findOne({ where: { user_id, res_id } })

        if (likeExist) {
            if (!likeExist.dis_like) {
                await model.like_res.update(
                    { ...likeExist, dis_like: 1 },
                    {
                        where: {
                            like_res_id: likeExist.like_res_id,
                        },
                        returning: true,
                    }
                );

                const data = await model.like_res.findOne({
                    attributes: ["like_res_id", "date_like", "dis_like"],
                    where: {
                        like_res_id: likeExist.like_res_id,
                    },
                    include: [
                        {
                            model: model.restaurant,
                            as: "re",
                        },
                    ],
                });

                res.status(200).json({ message: "Đã Dislike" })

            }
            if (likeExist.dis_like) {
                await model.like_res.update(
                    { ...likeExist, dis_like: 0 },
                    {
                        where: {
                            like_res_id: likeExist.like_res_id,
                        },
                    }
                );

                const data = await model.like_res.findOne({
                    attributes: ["like_res_id", "date_like", "dis_like"],
                    where: {
                        like_res_id: likeExist.like_res_id,
                    },
                    include: [
                        {
                            model: model.restaurant,
                            as: "re",
                        },
                    ],
                });

                res.status(200).json({ message: "Đã like" })
            }
        }

        if (!likeExist) {
            const createdLike = await model.like_res.create({
                user_id,
                res_id: +res_id,
                date_like,
            });

            const data = await model.like_res.findOne({
                attributes: ["like_res_id", "date_like", "dis_like"],
                where: {
                    like_res_id: createdLike.like_res_id,
                },
                include: [
                    {
                        model: model.restaurant,
                        as: "re",
                    },
                ],
            });

            res.status(200).json({ message: "Đã like" })
        }
    }
    catch (error) {
        console.error("likeAndDisLike:", error);

        res.status(400).json({ message: "Xử lý không thành công" })
    }
}

const getLikeRes = async (req, res) => {
    try {
        const { res_id } = req.params;

        const resExist = await model.restaurant.findOne({ where: { res_id } });

        if (!resExist) return res.status(400).json({ message: "Restaurant không tồn tại" });

        const listLikeOfRes = await model.like_res.findAll({
            where: {
                res_id: resExist.res_id,
                dis_like: 0,
            },
            include: [
                {
                    model: model.user_restaurant,
                    as: "user",
                    attributes: {
                        exclude: ["password"],
                    },
                },
            ],
        });

        res.status(200).json({
            message: "Xử lý thành công",
            data: {
                ...resExist.dataValues,
                listLikeOfRes,
            },
        });
    } catch (error) {
        res.status(400).json({ message: "Xử lý thất bại" });
    }
};

export {
    getFood,
    likeDislike,
    getLikeRes,
}